import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

server = 'smtp.gmail.com'
#Port SMTP : choix de 587 car prend en charge TLS
port = 587 
username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')
#Création instance client SMTP
client = smtplib.SMTP(server, port)
#Activation protocole de sécurité TLS
client.starttls()
#Authentification sur la serveur
client.login(username, password)
#Envoie mail
client.sendmail(username, "romain_bizot@etu.u-bourgogne.fr", "TEST")
#Fermeture de la connexion
client.quit()