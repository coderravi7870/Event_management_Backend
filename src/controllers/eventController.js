import jwt from "jsonwebtoken";

import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { name, description, date, category, token } = req.body;
    const imageUrl = req.file.path;

    if (!token) {
      return res.json({ success: false, message: "You are not authorized!" });
    }

    const { id } = await jwt.verify(token, process.env.JWT_SECRET);

    await Event.create({
      name,
      description,
      date,
      image: imageUrl,
      category,
      createdBy: id,
    });

    return res.json({ success: true, message: "Event Created Successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: "Event Created Successfully!",
      events,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getOneEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.json({ success: false, message: "This event doesn't exist" });
    }

    return res.json({
      success: true,
      message: "Event Found Successfully!",
      event,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
