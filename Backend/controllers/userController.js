import User from "../models/userModel";
import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";
import factory from "./factoryHandler";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const updateMe = catchAsync(async (req, res, next) => {
  // 1. create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Cannot update passwords in this route!', 400));
  }

  //2.Filtered out unwanted fields
  const filterBody = filterObj(req.body, 'firstName', 'lastName');

  // 3. update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});


