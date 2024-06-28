import asyncHandler from "../middleware/asyncHandler.js";
import Job from "../models/jobModel.js";

//@desc     Get All jobs
//@route    GET api/jobs
//@access   Public
const getJobs = asyncHandler(async(req, res) => {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
});

//@desc     Post a job (create)
//@route    POST api/jobs/create
//@access   Private/Employer
const createJob = asyncHandler(async(req, res) => {
    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        res.status(400);
        throw new Error("Please provide full job details.");
    };

    // if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    //     res.status(400);
    //     throw new Error("Please either provide fixed salary or ranged salary");
    // };

    // if (salaryFrom && salaryTo && fixedSalary) {
    //     res.status(400);
    //     throw new Error("Cannot Enter Fixed and Ranged Salary together.");
    // };

    const postedBy = req.user._id;
    
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    });

    res.status(201).json(job);
});

//@desc     Get My jobs (jobs Posted by me)
//@route    GET api/jobs/getmyjobs
//@access   Private/Employer
const getMyJobs = asyncHandler(async(req, res) => {
    const MyJobs = await Job.find({postedBy: req.user._id});
    res.status(200).json(MyJobs);
});

//@desc     Update a job
//@route    PUT api/jobs/:id
//@access   Public/Employer
const updateJob = asyncHandler(async(req, res) => {
    
    let job = await Job.findById(req.params.id);
    
    if (!job) {
        res.status(404);
        throw new Error("OOPS! Job not found..");
    };

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        message: "Job Updated!",
    });
});

//@desc     Delete a job
//@route    DELETE api/jobs/:id
//@access   Private/Employer
const deleteJob = asyncHandler(async(req, res) => {
    
    let job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error("OOPS! Job not found..");
    };

    await job.deleteOne();

    res.status(200).json({
        success: true,
        message: "Job Deleted!",
    });
});

//@desc     Get single job
//@route    GET api/jobs/:id
//@access   Public
const getSingleJob = asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id);
    console.log(job)

    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    };

    res.status(200).json(job);
});






export {
    getJobs,
    createJob,
    getMyJobs,
    updateJob,
    deleteJob,
    getSingleJob,
}
