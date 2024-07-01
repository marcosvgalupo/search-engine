package com.elasticsearch.search.processing;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TreatQuery {

    public static String treatContent(String content) {
        content = content.replaceAll("</?(som|math|strong)\\d*>", "");
        content = content.replaceAll("[^A-Za-z\\s]+", ""); // Preserve aspas duplas e dígitos
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }


    public static List<List<String>> treatQuotes(String query) {
        List<String> quotedContent = new ArrayList<>();
        List<String> nonQuotedContent = new ArrayList<>();

        // Pattern para capturar texto entre aspas, incluindo as próprias aspas
        Pattern quotesPattern = Pattern.compile("\\Q\"\\E(.*?)\\Q\"\\E");
        Matcher quotesContent = quotesPattern.matcher(query);

        while (quotesContent.find()) {
            quotedContent.add(quotesContent.group().trim()); // Adiciona o texto com as aspas
        }

        // Divide o texto usando o pattern de aspas
        String[] parts = quotesPattern.split(query);

        // Adiciona os textos sem aspas ao grupo não citado
        for (String part : parts) {
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                nonQuotedContent.add(trimmedPart);
            }
        }

        // Retorna os resultados como uma lista de listas
        List<List<String>> result = new ArrayList<>();
        result.add(nonQuotedContent); // Grupo sem aspas
        result.add(quotedContent);    // Grupo com aspas

        return result;
    }



    public static String getFullAdjustedQuery(String originalQuery, String suggestion) {
        String[] splittedQuery = originalQuery.toLowerCase().split(" ");
        String[] splittedSuggestion = suggestion.toLowerCase().split(" ");
        String adjustedQuery = "";

        if (suggestion.equals("")) return originalQuery;


        for (String word : splittedQuery) {
            boolean replaced = false;


            for (String sugWord : splittedSuggestion) {
                if (sugWord.contains(word)) {
                    adjustedQuery += suggestion + " ";
                    replaced = true;
                    break;
                }
            }
            // Se a palavra não foi substituída, mantém a palavra original na consulta ajustada
            if (!replaced) {
                adjustedQuery += word + " ";
            }
            if(adjustedQuery.trim().equals(suggestion)) break;
        }

        return adjustedQuery.trim(); // Remove espaços em branco extras no final
    }


    public static void main(String[] args) {
        System.out.println(
            treatQuotes("\"binary search\"")
        );
    }
}
