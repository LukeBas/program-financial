import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "0c44a96a-f061-4a18-a8b4-4a68e4acc414",
        authority: "https://login.microsoftonline.com/c990bb7a-51f4-439b-bd36-9c07fb1041c0",
        redirectUri: "http://localhost:3000",
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
    scopes: ["User.Read"],
};

export const getUserProfile = async (accessToken:any) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };
    try {
        const response = await fetch("https://graph.microsoft.com/v1.0/me", options);
        if (response.ok) {
            console.log(response)
            return response.json()
        }
    }
    catch(error){
        console.error(error)
    }
};
