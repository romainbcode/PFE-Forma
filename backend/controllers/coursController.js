const Cours = require("../models/coursModel");
const cloudinary = require("../utils/cloudinary");

exports.createCoursWithTeacherId = async (req, res, next) => {
  const {
    id_user_auth,
    titre,
    description,
    date,
    heuredebut,
    heurefin,
    image,
  } = req.body;

  try {
    const cours_image = await cloudinary.uploader.upload(image, {
      folder: "cours_image",
      height: 500,
      width: 500,
      crop: "scale",
    });
    console.log(cours_image);
    console.log("la");
    const teacherDejaFaitCours = await Cours.findOne({
      id_user_auth: id_user_auth,
    });
    console.log("la1");
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
            image: {
              public_id: cours_image.public_id,
              url: cours_image.secure_url,
            },
          },
        ],
      });
      res.status(200).json({
        success: true,
        teacherCoursFirst,
      });
    } else if (teacherDejaFaitCours) {
      console.log("la3");
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
                image: {
                  public_id: cours_image.public_id,
                  url: cours_image.secure_url,
                },
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
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

exports.getAllCours = async (req, res, next) => {
  try {
    const allCours = await Cours.find();
    res.status(200).json({
      success: true,
      allCours,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

exports.addUserInscritCours = async (req, res, next) => {
  const { id_user_auth, id_cours, id_user_auth_subscription } = req.body;
  try {
    const coursByIdProf = await Cours.findOne({
      id_user_auth: id_user_auth,
    });
    if (!coursByIdProf) {
      res.status(200).json({
        success: true,
        message: "Pas de cours trouvé",
      });
    }

    const getAllCoursByTeacher = await Cours.findOne({
      id_user_auth: id_user_auth,
      "cours._id": id_cours,
    });

    if (getAllCoursByTeacher) {
      const coursSpecifique = getAllCoursByTeacher.cours.find(
        (c) => c._id.toString() === id_cours
      );
      if (coursSpecifique) {
        const isUserAlreadySubscribe = coursSpecifique.userInscrit.find(
          (c) =>
            c.id_user_auth_subscription.toString() === id_user_auth_subscription
        );
        if (isUserAlreadySubscribe) {
          res.status(200).json({
            success: true,
            message: "Élève déjà enregistré dans le cours",
          });
        } else {
          const coursWithNewStudent = await Cours.findOneAndUpdate(
            {
              id_user_auth: id_user_auth,
              "cours._id": id_cours,
            },
            {
              $push: {
                "cours.$.userInscrit": {
                  id_user_auth_subscription: id_user_auth_subscription,
                },
              },
            },
            { new: true }
          );

          res.status(201).json({
            success: true,
            coursWithNewStudent,
            message: "Elève inscrit à ce cours avec succès !",
          });
        }
      } else {
        res.status(200).json({
          success: true,
          message: "Cours spécifique introuvable",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "Pas de cours trouvé pour cet ID",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
