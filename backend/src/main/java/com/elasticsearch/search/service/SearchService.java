package com.elasticsearch.search.service;

import co.elastic.clients.elasticsearch.core.search.Hit;
import com.elasticsearch.search.api.model.Result;
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

    public List<Result> submitQuery(String query) {
        var searchResponse = esClient.search(query, treatQuotes(query));
        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();

        var resultsList = hits.stream().map(h ->
                new Result()
                        .abs(treatContent(h.source().get("content").asText()))
                        .title(h.source().get("title").asText())
                        .url(h.source().get("url").asText())
        ).collect(Collectors.toList());

        return resultsList;
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
//
//    public int countHits(String query) {
//        var searchResponse = esClient.search(query, treatQuotes(query));
//        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();
//        return hits.size();
//    }
//

    public static void main(String[] args) {
        var s = new SearchService(new EsClient());
//        System.out.println(s.countHits("randomized binary"));
    }
}
