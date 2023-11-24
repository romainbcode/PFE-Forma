const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const FormationSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      trim: true,
      maxlength: [
        50,
        "Le titre de votre formation ne doit pas contenir plus de 50 caractères.",
      ],
      required: [true, "Votre formation doit obligatoirement avoir un titre."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        50,
        "La description de votre formation ne doit pas contenir plus de 50 caractères.",
      ],
      required: [true, "Vous devez obligatoirement ajouter une description."],
    },
    createdBy: {
      type: String,
      required: [
        true,
        "Une formation doit forcemment être associé à un professeur.",
      ],
    },
    chapitre: [
      {
        completed: { type: Date, default: Date.now },
        titre_chapitre: {
          type: String,
          trim: true,
          maxlength: [
            50,
            "Les titres de vos chapitres ne doivent pas dépasser 50 caractères.",
          ],
          required: [
            true,
            "Tous les chapitres doivent obligatoirement avoir un titre.",
          ],
        },
        description_chapitre: {
          type: String,
          trim: true,
          maxlength: [
            400,
            "La description de votre chapitre ne doit pas dépasser 400 caractères.",
          ],
          required: [
            true,
            "Tous les chapitres doivent obligatoirement avoir une description.",
          ],
        },
        sous_chapitre: [
          {
            completed: { type: Date, default: Date.now },
            titre_sous_chapitre: {
              type: String,
              trim: true,
              maxlength: [
                50,
                "Les titres de vos sous-chapitres ne doivent pas dépasser 50 caractères.",
              ],
              required: [
                true,
                "Tous les sous-chapitres doivent obligatoirement avoir un titre.",
              ],
            },
            description_sous_chapitre: {
              type: String,
              trim: true,
              maxlength: [
                400,
                "Les descriptions de vos sous-chapitres ne doivent pas dépasser 400 caractères.",
              ],
              required: [
                true,
                "Tous les sous-chapitres doivent obligatoirement avoir une description.",
              ],
            },
            corps_texte_image: [
              {
                completed: { type: Date, default: Date.now },
                texte: {
                  type: String,
                  trim: true,
                  maxlength: [
                    400,
                    "Les textes ne doivent pas dépasser 400 caractères.",
                  ],
                  required: [
                    true,
                    "Un sous-chapitre doit obligatoirement avoir du texte.",
                  ],
                },
                //image: {},
                texte_attention: {
                  type: String,
                  trim: true,
                  maxlength: [
                    400,
                    "Les textes_attentions ne doivent pas dépasser 400 caractères.",
                  ],
                },
                texte_conseil: {
                  type: String,
                  trim: true,
                  maxlength: [
                    400,
                    "Les textes_conseils ne doivent pas dépasser 400 caractères.",
                  ],
                },
              },
            ],
          },
        ],
        Quiz: { type: ObjectId, ref: "Quiz" },
      },
    ],
    avis: [
      {
        id_user: {
          type: ObjectId,
          ref: "User",
          required: [
            true,
            "Un avis doit forcemment être associé à un utilisateur.",
          ],
        },
        note_sur5: {
          type: Number,
          min: [0, "Une note négative n'est pas possible"],
          max: [5, "Une note supérieur à 5 n'est pas possible"],
          required: [true, "Un avis doit forcemment être un chiffre."],
        },
        completed: { type: Date, date: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Formation", FormationSchema);
