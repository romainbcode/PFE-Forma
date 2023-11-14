const Formation = require("../models/formationModel");

exports.createFormation = async (req, res, next) => {
  const titleforma = "Titre forma";
  const descforma = "Description forma";
  const titlechapitre = "Titre chapitre";
  const descchapitre = "Description chapitre";
  const titlesouschapitre = "Titre sous-chapitre";
  const descsouschapitre = "Description sous-chapitre";
  const text = "corps-text";
  const textattention = "corps-texte-attention";
  const textconseil = "corps-texte-conseil";
  try {
    const formation = await Formation.create({
      title: titleforma,
      description: descforma,
      chapitre: [
        {
          titre_chapitre: titlechapitre,
          description_chapitre: descchapitre,
          sous_chapitre: [
            {
              titre_sous_chapitre: titlesouschapitre,
              description_sous_chapitre: descsouschapitre,
              corps_texte_image: [
                {
                  texte: text,
                  texte_attention: textattention,
                  texte_conseil: textconseil,
                },
              ],
            },
          ],
        },
      ],
      note: [
        {
          note: 12,
        },
      ],
    });

    res.status(201).json({
      success: true,
      formation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
