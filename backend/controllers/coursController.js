const Cours = require("../models/coursModel");
exports.createCoursWithTeacherId = async (req, res, next) => {
  const { id_user_auth, titre, description, date, heuredebut, heurefin } =
    req.body;

  try {
    const teacherDejaFaitCours = await Cours.findOne({
      id_user_auth: id_user_auth,
    });
    if (!teacherDejaFaitCours) {
      const teacherCoursFirst = await Cours.create({
        id_user_auth: id_user_auth,
        cours: [
          {
            titre: titre,
            description: description,
            dateJour: date,
            dateHeureDebut: heuredebut,
            dateHeureFin: heurefin,
          },
        ],
      });
      res.status(200).json({
        success: true,
        teacherCoursFirst,
      });
    } else if (teacherDejaFaitCours) {
      const teacherCours = await Cours.findOneAndUpdate(
        {
          id_user_auth: id_user_auth,
        },
        {
          $push: {
            cours: [
              {
                titre: titre,
                description: description,
                dateJour: date,
                dateHeureDebut: heuredebut,
                dateHeureFin: heurefin,
              },
            ],
          },
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        teacherCours,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
