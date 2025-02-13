import msal
import requests
from userInformation import fordUser

#Código responsável por autenticar o usuário na Azure e retornar um
#token de liberação de acesso

def start():
    client_id = '0c44a96a-f061-4a18-a8b4-4a68e4acc414'
    authority = 'https://login.microsoftonline.com/c990bb7a-51f4-439b-bd36-9c07fb1041c0'
    scope = ['User.Read']

    app = msal.PublicClientApplication(
        client_id,
        authority=authority
    )
    result = app.acquire_token_interactive(scopes=scope)
    if 'access_token' in result:

        #Com o token de acesso em mãos, o usuário pode acessar os outros recursos
        #da Azure, como o Graph, onde contém as informações do usuário, como
        #nome, email corporativo, cdsid, etc.

        headers = {'Authorization': 'Bearer ' + result['access_token']}
        graph_url = 'https://graph.microsoft.com/v1.0/me'
        graph_response = requests.get(graph_url, headers=headers)

        if graph_response.status_code == 200:
            user_data = graph_response.json()
            fordUser.user_name = user_data.get('displayName', '')
            fordUser.user_email = user_data.get('mail', '').lower() or user_data.get('userPrincipalName', '').lower()
            return 1
        else:
            print("Erro ao acessar Microsoft Graph API:", graph_response.status_code)
            return 0
    else:
        print("Erro ao adquirir token de acesso.")
        return 0
