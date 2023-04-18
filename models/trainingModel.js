import mongoose from "mongoose";
const { Schema, model } = mongoose;

const trainingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    image: {
      type: String,
      // required: [true, "Please add an image"],
    },
  },
  {
    collection: "trainings",
  }
);

const Training = model("Training", trainingSchema);
export default Training;
