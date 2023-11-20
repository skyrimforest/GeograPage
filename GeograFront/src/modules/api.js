const URL_PREFIX = "http://127.0.0.1:9000/";
const APIS = {
    login:"api/login",
    blog:"group1/blog",
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

