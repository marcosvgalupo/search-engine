package com.elasticsearch.search.processing;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TreatQuery {

    public static String treatContent(String content) {
        content = content.replaceAll("</?(som|math)\\d*>", "");
        content = content.replaceAll("[^A-Za-z\\s]+", "");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }

    public static List<String> treatQuotes(String query){
        if(query.contains("\"")){
            Pattern quotesPattern = Pattern.compile("\\Q\"\\E(.*?)\\Q\"\\E", Pattern.DOTALL);
            Matcher quotesContent = quotesPattern.matcher(query);

            return quotesContent.results().map(m -> m.group(1)).toList();
        }
        return new ArrayList<String>();
    }
}
