var request = require('request');
var sanitizeHTML = require('sanitize-html');

var built = {
    url: 'https://api.built.io/v1/classes/index/objects/',
    headers: {
        'application_api_key': 'blt5a6a3a66b6ae9f16',
        'application_uid' : 'crawl',
        'Content-Type' : 'application/json'
    }
};

var siteUrl = process.argv.slice(2)[0];
var tags = '';
console.log("Please Wait...");
console.log("--------------");


/*-------------------------------------------------------------/
| Get Keywords
|--------------------------------------------------------------/
| 
*/
function getKeywords(content) {

    var text = content;

    var blackList = ["jul", "text", "—", "state", "nbsp", "games", "a", "able", "about", "above", "abroad", "according", "accordingly", "across", "actually", "adj", "after", "afterwards", "again", "against", "ago", "ahead", "aint", "all", "allow", "allows", "almost", "alone", "along", "alongside", "already", "also", "although", "always", "am", "amid", "amidst", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "arent", "around", "as", "as", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "full", "b", "back", "backward", "backwards", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "c", "came", "can", "cannot", "cant", "cant", "caption", "cause", "causes", "certain", "certainly", "changes", "clearly", "cmon", "co", "co.", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldnt", "course", "cs", "currently", "d", "dare", "darent", "define", "defines", "definitely", "describe", "described", "despite", "demands", "did", "didnt", "different", "directly", "do", "does", "doesnt", "doing", "done", "dont", "down", "downwards", "during", "e", "each", "edu", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "entirely", "especially", "et", "etc", "even", "ever", "evermore", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "f", "fairly", "far", "farther", "few", "fewer", "fifth", "first", "five", "followed", "following", "follows", "for", "forever", "former", "formerly", "forth", "forward", "found", "four", "from", "further", "furthermore", "g", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "h", "had", "hadnt", "half", "happens", "hardly", "has", "hasnt", "have", "havent", "having", "he", "hed", "hell", "hello", "help", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "ignored", "ill", "im", "immediate", "in", "inasmuch", "inc", "inc.", "indeed", "indicate", "indicated", "indicates", "inner", "inside", "insofar", "instead", "into", "inward", "is", "isnt", "it", "itd", "itll", "its", "its", "itself", "ive", "j", "just", "k", "keep", "keeps", "kept", "know", "known", "knows", "l", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "likewise", "little", "look", "looking", "looks", "low", "lower", "ltd", "m", "made", "mainly", "make", "making", "makes", "many", "may", "maybe", "maynt", "me", "mean", "meantime", "meanwhile", "merely", "might", "mightnt", "mine", "minus", "miss", "more", "moreover", "most", "mostly", "move", "mr", "mrs", "much", "must", "mustnt", "my", "myself", "n", "name", "namely", "nd", "near", "nearly", "necessary", "need", "neednt", "needs", "neither", "never", "neverf", "neverless", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "no-one", "nor", "normally", "not", "nothing", "notwithstanding", "novel", "now", "nowhere", "number", "o", "obviously", "of", "off", "offered", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "ones", "only", "onto", "opposite", "or", "other", "others", "otherwise", "ought", "oughtnt", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "p", "page", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provided", "provides", "q", "que", "quite", "qv", "r", "rather", "rd", "re", "really", "reasonably", "recent", "recently", "regarding", "regardless", "regards", "relatively", "respectively", "revealed", "right", "round", "s", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "shant", "she", "shed", "shell", "shes", "should", "shouldnt", "since", "six", "so", "some", "somebody", "someday", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "thatll", "thats", "thats", "thatve", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "therell", "therere", "theres", "theres", "thereupon", "thereve", "these", "they", "theyd", "theyll", "theyre", "theyve", "thing", "things", "think", "third", "thirty", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "till", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "upwards", "us", "use", "used", "useful", "uses", "user", "users", "using", "usually", "v", "value", "various", "ve", "versus", "very", "via", "viz", "vs", "w", "want", "wants", "was", "wasnt", "way", "we", "wed", "welcome", "well", "well", "went", "were", "were", "werent", "weve", "what", "whatever", "whatll", "whats", "whatve", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "whichever", "while", "whilst", "whither", "who", "whod", "whoever", "whole", "wholl", "whom", "whomever", "whos", "whose", "why", "will", "willing", "wish", "with", "within", "without", "wonder", "wont", "would", "wouldnt", "x", "y", "yes", "yet", "you", "youd", "youll", "your", "youre", "yours", "yourself", "yourselves", "youve", "z", "zero", "of", "the", "most", "ll", "'", "»"];

    // lower all text
    text = text.toLowerCase();

    /* replace punctuation mark from string to empty space */
    text = text.replace(/[\.,’''"-\/#!@$%\^&\*;:{}=\-_`~()\|?[\]]/g, " ");

    //remove new line
    text = text.replace(/\r?\n|\r/g, " ");

    var array = text.split(" ");

    var words = {};
    var keywords = [];

    //Will store all words with k,v
    var item = '';
    for (var i in array) {
        item = array[i];
        if (words[item]) {
            words[item] += 1;
        } else {
            words[item] = 1;
        }
    }

    //Delete words
    delete words[''];

    var totalWordCount = 0;
    for (var key in words) {
        totalWordCount += 1;

        //Count for occurance > 1
        if (words[key] > 3) {
            var keyword = key.trim();
            if (blackList.indexOf(keyword) < 0) {
                if (keyword.length > 0) {
                    keywords.push(keyword);
                }

            }
        }
    }

    // Display Output on console
		console.log('----------');
		console.log('Total Words : ' + totalWordCount);
		console.log('Total Keywords : ' + keywords.length);
		//console.log( (((totalWordCount - keywords.length)/totalWordCount) * 100).toFixed(2));

		console.log('----------');


        if(keywords){
            /*console.log( keywords.join(', ') );
            console.log('----------');*/
            saveOnBuilt(keywords.join());
        }
}




/*-------------------------------------------------------------/
| Resquest Site
|--------------------------------------------------------------/
| 
*/
request(siteUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var body = sanitizeHTML(body, {
            allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre']
        });

        //remove html tags
        body = body.replace(/(<([^>]+)>)/ig, "");

        //remove empty spaces and white spaces
        body = body.replace(/[\.,’''"-\/#!©@$%\^&\*;:{}=\-_`~()\[\]]/g, " ");

        //remove numbers
        body = body.replace(/[0-9]/g, "");

        //remove new line 
        body.replace(/\s+/gm, ' ');
    }

    //Calling get keyword and passing `body`
    getKeywords(body);

});

/*-------------------------------------------------------------/
| Save on Built.io
|--------------------------------------------------------------/
| 
*/

function saveOnBuilt(keywords){

    built.form = {
        "object" : {
            "url" : siteUrl,
            "tags" : keywords
        }
    };

	request.post( built , 
        function(error, response, body){ 
            if(response.statusCode >= 200 && response.statusCode <= 299){
                console.log('Done!'); 
            }
            
        });
};