import multer from "multer";
import {imageNameMaker} from "./maker";
import {FILE_TYPE_MAP, getExtensionOfImage} from "./constant";

const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        const isValid = getExtensionOfImage(file.mimetype);
        let uploadError: Error | null = new Error('invalid image type');

        if (isValid)
        {
            uploadError = null
        }
        cb(null, 'src/public/upload')
    },
    filename: async function (req, file, cb)
    {
        const extension = getExtensionOfImage(file.mimetype);
        cb(null, `${await imageNameMaker('image')}.${extension}`)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const uploadOptions = multer({storage: storage})