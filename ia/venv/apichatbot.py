from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.llms import LlamaCpp
from flask import Flask
from flask import request
import sys

from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/IA/generateText/<texte>", methods=['GET'])
def generateConvIA(texte=None):
    if request.method == 'GET':
        callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

        n_gpu_layers = 1  # Metal=1 est suffiant pour un Mac puce M1 
        n_batch = 512  # Valeur doit etre entre 1 et n_ctx (affiché pendant l'exécution = 512) prend en compte la quantité de mémoire vive du mac M1
        llm = LlamaCpp(
            model_path="modeleIA/llama-2-7b-chat.Q4_K_M.gguf",
            n_gpu_layers=n_gpu_layers,
            n_batch=n_batch,
            f16_kv=True,  # Doit etre = True sinon problème après plusieurs execution
            callback_manager=callback_manager,
            verbose=True,  # Verbose est obligatoire pour passer le callback manager
        )

        prompt = f"""
                Question: {texte} en moins de 50 mots en francais.
                """
        reponse = llm(prompt)
        return reponse
    
if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "check_syntax":
            print("Build [OK]")
            exit(0)
        else:
            print("Passed argument not supported ! Supported argument : check_syntax")
            exit(1)
    app.run(host='0.0.0.0', debug=True, port="3003")