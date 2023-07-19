import openai
import spacy

open_ai_api_key = 'INPUT_YOUR KEY'
openai.api_key = open_ai_api_key

def ask_open_ai(message):
    try:
        response = openai.Completion.create(
            model = "text-davinci-003",
            prompt = message,
            max_tokens=100,
            n=1,
            stop=None,
            temperature=0.7
        )
        answer = response.choices[0].text.strip()
        return answer
    except Exception as e:
        return str(e)

def get_search_terms(question):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(question)
    nouns = [token.text.lower() for token in doc if token.pos_ == "NOUN"]
    return nouns
