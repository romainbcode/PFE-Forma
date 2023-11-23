import smtplib
import os
from flask import *
from flask_cors import CORS
from dotenv import load_dotenv



app = Flask(__name__)
CORS(app)


load_dotenv()

@app.route('/mail', methods=['POST'])
def envoieMail():        
    data = request.get_json()

    nomUser = data["nomUser"]
    emailUser = data["emailUser"]
    nomFormation = data["nomFormation"]
    
    corpsMail = "Cher " + str(nomUser) + "\n" \
        "📝 Nous sommes ravis de vous accueillir dans notre formation " + str(nomFormation) + "! \n" \
        "🚀 Felicitations pour ce premier pas vers l'apprentissage et l'acquisition de nouvelles compétences. Nous sommes convaincus que cette expérience sera enrichissante et source d'inspiration pour vous.\n"\
        "Nos formateurs dévoués sont la pour vous accompagner à chaque étape. N'hesitez pas à poser des questions à notre robot 🤖!\n"\
        "Nous sommes impatients de partager ce voyage avec vous et de celebrer vos reussites tout au long de la formation."\
        "Bonne chance ! Nous sommes convaincus que vous brillerez comme jamais dans cette nouvelle etape de votre parcours."\
        "Cordialement,"\
        "L'équipe de [Votre Entreprise]"
    
    username = os.getenv('USERNAME')
    password = os.getenv('PASSWORD')
    """
    server = 'smtp.gmail.com'

    #Port SMTP : choix de 587 car prend en charge TLS
    port = 587 

    #Création instance client SMTP
    client = smtplib.SMTP(server, port)

    #Activation protocole de sécurité TLS
    client.starttls()

    #Authentification sur la serveur
    client.login(username, password)

    #Envoie mail
    client.sendmail(username, "romain_bizot@etu.u-bourgogne.fr", msg=f"{corpsMail}".encode('utf-8'),)

    #Fermeture de la connexion
    client.quit()
    """ 
    

    return "mail envoyé"
    
if __name__ == '__main__':
    app.run(host='localhost', port=3002, debug=True)
    