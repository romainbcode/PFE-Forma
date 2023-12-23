const mongoose = require("mongoose");

const CoursSchema = new mongoose.Schema(
  {
    id_user_auth: {
      type: String,
      unique: true,
      trim: true,
      required: [
        true,
        "Un utilisateur dot forcemment avoir un id provenant de auth0.",
      ],
    },
    cours: [
      {
        titre: {
          type: String,
          trim: true,
          required: [true, "Un cours doit forcemment avoir un titre."],
        },
        description: {
          type: String,
          trim: true,
          required: [true, "Un cours doit forcemment avoir une description."],
        },
        dateJour: {
          type: String,
          trim: true,
          required: [true, "Un cours doit forcemment se dérouler un jour."],
        },
        dateHeureDebut: {
          type: String,
          trim: true,
          required: [
            true,
            "Un cours doit forcemment avoir une heure de début.",
          ],
        },
        dateHeureFin: {
          type: String,
          trim: true,
          required: [true, "Un cours doit forcemment avoir une heure de fin."],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cours", CoursSchema);
