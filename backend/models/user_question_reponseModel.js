const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserQuestionReponseSchema = new mongoose.Schema(
  {
    id_user: {
      type: String,
      required: [
        true,
        "Un utilisateur doit forcemment être associé à une liste de questions et de réponses.",
      ],
    },
    user_question_reponse: [
      {
        id_quiz: {
          type: ObjectId,
          ref: "Quiz",
          required: [
            true,
            "Un quiz doit forcemment être associé à une liste de questions et de réponses.",
          ],
        },
        question_reponse: [
          {
            id_question: {
              type: ObjectId,
              ref: "Quiz",
              required: [
                true,
                "L'id de la question doit forcemment être renseigné.",
              ],
            },
            id_reponse: {
              type: ObjectId,
              ref: "Quiz",
              required: [
                true,
                "L'id de la réponse doit forcemment être renseigné.",
              ],
            },
            etat_reponse_user: {
              type: Boolean,
              default: false,
              required: [
                true,
                "L'état de la réponse doit forcemment être renseigné.",
              ],
            },
            date_reponse: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserQuestionReponse",
  UserQuestionReponseSchema
);
