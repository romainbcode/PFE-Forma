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
    
    corpsMail = "Cher " + str(nomUser) + "\n\n" \
        "📝 Nous sommes ravis de vous accueillir dans notre formation " + str(nomFormation) + "! \n" \
        "🚀 Felicitations pour ce premier pas vers l'apprentissage et l'acquisition de nouvelles compétences. \nNous sommes convaincus que cette expérience sera enrichissante et source d'inspiration pour vous.\n"\
        "N'hesitez pas à poser des questions à notre robot 🤖!\n\n"\
        "Cordialement,\n"\
        "L'équipe de EduVolution"
    
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

    #Envoie mail, Faut changer l'adresse du destinataire
    client.sendmail(username, emailUser, msg=f"{corpsMail}".encode('utf-8'),)

    #Fermeture de la connexion
    client.quit()
    """
    

    return "mail envoyé"
    
if __name__ == '__main__':
    app.run(host='localhost', port=3002, debug=True)
    