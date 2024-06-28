import asyncHandler from "../middleware/asyncHandler.js";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary"




//@desc     Apply for a job
//@route    POST api/applications
//@access   Pravate/Applicant
const applyForJob = asyncHandler(async(req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400);
        throw new Error("Resume File Required!");
    };

    const { resume } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(resume.mimetype)) {
        res.status(400);
        throw new Error("Invalid file type. Please upload a PNG, JPG or WEBP file.");
    };

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    console.log(cloudinaryResponse)

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        res.status(500);
        throw new Error("Failed to upload Resume to Cloudinary");
    };

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    const applicantID = {
      user: req.user._id,
      role: "Applicant",
    };

    if (!jobId) {
        res.status(400);
        throw new Error("Job not found!");
    };

    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
        res.status(404);
        throw new Error("Job not found!");
    };

    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };

    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
      ) {
        res.status(400);
        throw new Error("Please fill all fields.");
    };

    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
    });

    res.status(201).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
});


//@desc     Get all applications
//@route    GET api/applications
//@access   Pravate/Employer
const getApplications = asyncHandler( async(req, res) => {
    const applications = await Application.find({});
  res.json(applications);
});

//@desc     Get all my applications
//@route    GET api/applications/getmyapplications
//@access   Pravate/Applicant
const getMyApplications = asyncHandler( async(req, res) => {
   //These 2 options helps to get the all applications submited by a job seeker 
    // const { _id } = req.user;
    const {user} = req.user._id
   
    // const applications = await Application.find({ "applicantID.user": _id });
    const applications = await Application.find({user});
    res.status(200).json(applications);
});

//@desc     Delete an application
//@route    DELETE api/applications/:id
//@access   Pravate/Employer
const deleteApplication = asyncHandler( async(req, res) => {
    const application = await Application.findById(req.params.id);

    if (!application) {
        res.status(404);
        throw new Error("OOPS! application not found.");
    };

    await application.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application Deleted!",
    });
});


export {
    applyForJob,
    getApplications,
    getMyApplications,
    deleteApplication,
}