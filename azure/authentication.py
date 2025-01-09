import msal

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
        print("Autenticado com sucesso.")
    else:
        print("Erro na autenticação:", result.get("error"), result.get("error_description"))
