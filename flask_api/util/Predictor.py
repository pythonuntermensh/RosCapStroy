import re

class Predictor():
    def __init__(self, model):
        self.model = model

    def _prepare_text(self, text):
        text = text.replace("&quot;", "")
        delimiters = "условия", "требования", "примечания", "обязанности", ";", "\n"
        regex_pattern = '|'.join(map(re.escape, delimiters))
        regex_pattern += "|" + '(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s'
        slices =  re.split(regex_pattern, text.lower())

        result = []
        abbreviation_pattern = re.compile(r'\b\w+\.$')
        for sentence in slices:
            sentence = re.sub("[-|:]", " ", sentence)
            sentence = sentence.strip().capitalize()
            if result and re.match(abbreviation_pattern, sentence):
                result[-1] += ' ' + sentence
            else:
                result.append(sentence)

        out = []
        for i in result:
            i = re.sub("[-|:]"," ",i)
            i = i.strip()
            # i = remove_multiple_spaces(remove_numbers(remove_punctuation(i.lower())))
            # i = remove_stop_words(i)
            # i = lemmatize_text(i)
            if i == "":
                continue
            out.append(i)

        return out

    def _categorize_text(self, text):
        slices = self._prepare_text(text)

        vacancy = {
            'responsibilities': [],
            'requirements': [],
            'terms': [],
            'notes': []
        }

        for text in slices:
            pred = self.model.predict([text])
            vacancy[pred[0]].append(text)
        return vacancy

    def get_final_categories(self, text):
        final_categories = {}
        categories = self._categorize_text(text)
        for k, v in categories.items():
            final_category_text = "\n".join(v)
            final_categories[k] = final_category_text
        return final_categories