import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ["Workshop", "Webinar", "Conference", "Meetup"], required: true },
  attendees: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Event =mongoose.models.Event ||  mongoose.model("Event", eventSchema);
export default Event;
