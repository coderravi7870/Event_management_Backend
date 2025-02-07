import express from 'express';
import { createEvent, getEvents, getOneEvents} from '../controllers/eventController.js';

const eventRouter = express.Router();

import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../halper/cloudinary.js";
import multer from 'multer'

// Configure cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"Events",
    }
});

const upload = multer({storage})

eventRouter.post("/create-event",upload.single("image"),createEvent);

eventRouter.get("/get-events",getEvents)
eventRouter.get("/:id",getOneEvents)

export default eventRouter