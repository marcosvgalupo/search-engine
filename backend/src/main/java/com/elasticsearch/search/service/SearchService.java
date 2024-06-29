package com.elasticsearch.search.service;

import co.elastic.clients.elasticsearch.core.search.Hit;

import com.elasticsearch.search.api.model.Result;
import com.elasticsearch.search.api.model.ResultHits;
import com.elasticsearch.search.domain.EsClient;
import com.elasticsearch.search.processing.TreatQuery;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final EsClient esClient;

    public SearchService(EsClient esClient) {
        this.esClient = esClient;
    }

    public Result submitQuery(String query, Integer page) {
        var searchResponse = esClient.search(query, TreatQuery.treatQuotes(query), page);
        Result result = new Result();


        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();

        List<ResultHits> hitsList = hits.stream().map(h ->
                new ResultHits()
                            .abs(TreatQuery.treatContent(h.source().get("content").asText()))
                            .title(h.source().get("title").asText())
                            .url(h.source().get("url").asText())
        ).collect(Collectors.toList());


        var suggestResponse = esClient.searchSuggestion(query);
        var suggestions = suggestResponse.suggest();

        var totalHits = searchResponse.hits().total().value();


        System.out.println(suggestions);
        System.out.println(suggestions);

        String search_suggestion = "teste";
//        System.out.println(suggestions);
        result.hits(hitsList);
        result.suggest(search_suggestion);
        result.total((int)totalHits);


        return result;
    }

    public static void main(String[] args) {
//        var s = new SearchService(new EsClient());
//        System.out.println(s.submitQuery("randomized binar"));
    }
}
