package com.elasticsearch.search.service;

import co.elastic.clients.elasticsearch.core.search.Hit;

import com.elasticsearch.search.api.model.Result;
import com.elasticsearch.search.api.model.ResultHits;
import com.elasticsearch.search.domain.EsClient;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final EsClient esClient;

    public SearchService(EsClient esClient) {
        this.esClient = esClient;
    }

    public Result submitQuery(String query) {
        var searchResponse = esClient.search(query, treatQuotes(query));
        Result result = new Result();


        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();

        List<ResultHits> hitsList = hits.stream().map(h ->
                new ResultHits()
                            .abs(treatContent(h.source().get("content").asText()))
                            .title(h.source().get("title").asText())
                            .url(h.source().get("url").asText())
        ).collect(Collectors.toList());


//        var suggestResponse = esClient.searchSuggestion(query);
//        var suggestions = suggestResponse.suggest();

        String search_suggestion = "";
        result.hits(hitsList);
        result.suggest(search_suggestion);


        return result;
    }

    private String treatContent(String content) {
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

    public static void main(String[] args) {
        var s = new SearchService(new EsClient());
        System.out.println(s.submitQuery("randomized binar"));
    }
}
