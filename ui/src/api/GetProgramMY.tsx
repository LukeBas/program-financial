const url = 'http://localhost:8000'

export async function GetProgramsInformation() {
    try {
        const response = await fetch(url + '/getProgramMY');
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Erro: ", error);
    }
}