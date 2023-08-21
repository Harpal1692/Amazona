const Randomstring = require("randomstring");
const mediamodel = require("./MediaModel");
const fs = require("fs")

class MediaController {
    async GetMedia(req, res) {
        try {
            let File = req.files.file;
            console.log(File)
            let { mimetype, size } = File
            let name = File.name;
            let ext = name.split('.');
            ext = ext[ext.length - 1];

            name = Randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            }).toLowerCase();
            name = name + '.' + ext;

            File.name = name;

            mimetype = mimetype.split("/")[0]

            if (mimetype !== 'image' && mimetype !== 'video') {
                mimetype = 'application'
            }

            const folderName = `./uploads/${mimetype}`;

            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
            } catch (err) {
                console.error(err);
            }

            let path = `./uploads/${mimetype}/${name}`;
            const result = await File.mv(path);
            path = path.substring(1, path.length)
            let Media = await mediamodel.create({ name, mimetype, ext, path, size });
            let url = `http://localhost:6001${path}`
            Media = Media._doc
            Media.url = url
            // const agg = await mediamodel.aggregate([

            //     {
            //         $match: { _id: new mongoose.Types.ObjectId(Media._id) }
            //     },
            //     {
            //         $addFields: { url: `http:localhost:5100${path}` }
            //     },
            // ])
            res.json({ success: true, media: { ...Media } });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }

    async ShowMedia(req, res) {
        try {
            const result = await mediamodel.aggregate([
                {
                    $match: {
                        $or: [
                            { mimetype: "image" },
                            { mimetype: "video" }
                        ]
                    }
                },
                {
                    $addFields: {
                        url: {
                            $concat: ["http://localhost:6001", "$path"]
                        }
                    }
                },
                {
                    $sort: { createdAt: -1 }
                }
            ]);

            if (result) return res.status(200).send({ message: "Success", media: result })
            return res.status(400).send({ message: "Somthing Went Wrong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Sevrer Error" })
        }

    }
}

const mediaController = new MediaController();
module.exports = mediaController;


