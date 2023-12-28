const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    id_user_auth: {
      type: String,
      unique: true,
      trim: true,
      required: [
        true,
        "Un utilisateur dot forcemment avoir un id provenant du auth0.",
      ],
    },
    scores: [
      {
        id_quiz: {
          type: ObjectId,
          ref: "Quiz",
          required: [
            true,
            "L'id du quiz doit forcemment être renseigné pour le score.",
          ],
        },
        id_chapitre: {
          type: String,
          required: [
            true,
            "L'id du chapitre doit forcemment être renseigné pour le score.",
          ],
        },
        scores_pourcentage: {
          type: Number,
          required: [true, "Un quiz doit forcemment avoir un score"],
        },
        completed: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    niveau: { type: Number },
    formationInscrite: [
      {
        id_formation: {
          type: ObjectId,
          ref: "Formation",
          required: [
            true,
            "L'id de la formation doit forcemment être renseigné dans la liste des formations où l'utilisateur est inscrit.",
          ],
        },
        date_inscription: { type: Date, default: Date.now },
      },
    ],
    badge: [
      {
        id_quiz: {
          type: ObjectId,
          ref: "Quiz",
          required: [
            true,
            "L'id du quiz doit forcemment être renseigné pour le badge.",
          ],
        },
        completed: {
          type: Date,
          required: [
            true,
            "La date d'ajout du badge doit forcemment être renseigné.",
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
