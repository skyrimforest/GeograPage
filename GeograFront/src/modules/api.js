const URL_PREFIX = "http://127.0.0.1:4523/m1/3333148-0-default/";
const APIS = {
    login:"api/login",
    // login: "api/login",
    // nlp: "api/nlp",
    // cv: "api/cv",
    // nlpemoana:"api/nlp/emoana",
    // cvquery:"api/cv/query",
    // nlpcloud:"api/nlp/cloud",
}

for (const i in APIS) {
    APIS[i] = URL_PREFIX + APIS[i];
}

export default APIS

