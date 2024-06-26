const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const QuizSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      trim: true,
      maxlength: [
        50,
        "Le titre de votre quiz ne doit pas contenir plus de 50 caractères.",
      ],
      required: [true, "Votre quiz doit obligatoirement avoir un titre."],
    },
    createdBy: {
      type: String,
      required: [
        true,
        "Un quiz doit forcemment être associé à un utilisateur.",
      ],
    },
    question_reponse: [
      {
        question: {
          type: String,
          trim: true,
          required: [true, "Il doit forcemment y avoir une question."],
          maxlength: [100, "La question ne doit pas dépasser 100 caractères."],
        },
        reponse: [
          {
            reponse_texte: {
              type: String,
              trim: true,
              required: [
                true,
                "Il doit forcemment y avoir une réponse à une question.",
              ],
              maxlength: [
                200,
                "La question ne doit pas dépasser 200 caractères.",
              ],
            },
            etat_reponse: {
              type: Boolean,
              required: [
                true,
                "Une réponse doit forcemment avoir un état de réponse.",
              ],
            },
          },
        ],
        completed: { type: Date, default: Date.now },
        date_modification: { type: Date, default: Date.now },
      },
    ],
    note: [
      {
        id_user_auth: {
          type: String,
          unique: true,
          trim: true,
          required: [
            true,
            "Une note doit forcemment être associé à un utilisateur.",
          ],
        },
        id_chapitre: {
          type: String,
          required: [
            true,
            "L'id du chapitre doit forcemment être renseigné pour le score.",
          ],
        },
        score_pourcentage: {
          type: Number,
          min: [0, "Un score négative n'est pas possible"],
          max: [
            100,
            "Un score avec un pourcentage supérieur à 100 n'est pas possible",
          ],
          required: [true, "Une note doit forcemment avoir un score."],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
