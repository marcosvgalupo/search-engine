package com.elasticsearch.search.domain;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.*;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.FieldSuggester;
import co.elastic.clients.elasticsearch.core.search.Suggester;
import co.elastic.clients.elasticsearch.core.search.Suggestion;
import co.elastic.clients.elasticsearch.core.search.SuggestionBuilders;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.elasticsearch.search.processing.BuildQuery;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.altindag.ssl.SSLFactory;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.List;



@Component
public class EsClient {
    private ElasticsearchClient elasticsearchClient;
    private static final int RESULT_MAX_VALUE = 10000;
    private Query myQuery;
    private Suggester.Builder sb;

    public EsClient() {
        createConnection();
    }

    private void createConnection() {
        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();

        String USER = "elastic";
        String PWD = "user123";
        credentialsProvider.setCredentials(AuthScope.ANY,
            new UsernamePasswordCredentials(USER, PWD));

        SSLFactory sslFactory = SSLFactory.builder()
            .withUnsafeTrustMaterial()
            .withUnsafeHostnameVerifier()
            .build();

        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200, "https"))
            .setHttpClientConfigCallback((HttpAsyncClientBuilder httpClientBuilder) -> httpClientBuilder
                .setDefaultCredentialsProvider(credentialsProvider)
                .setSSLContext(sslFactory.getSslContext())
                .setSSLHostnameVerifier(sslFactory.getHostnameVerifier())
            ).build();

        ElasticsearchTransport transport = new RestClientTransport(
            restClient,
            new JacksonJsonpMapper()
        );

        elasticsearchClient = new co.elastic.clients.elasticsearch.ElasticsearchClient(transport);
    }

    public SearchResponse search(String query, List<String> contentInQuotes, Integer page) {


        if(!contentInQuotes.isEmpty()){
            myQuery = BuildQuery.must(
                            BuildQuery.matchPhrase("content", query)
            );
        }
        else {
            myQuery = BuildQuery.should(
                            BuildQuery.match("content", query)
            );
        }

        SearchResponse<ObjectNode> response;
        assert myQuery != null;
        try {
            response = elasticsearchClient.search(s -> s
                .index("wikipedia").from((page-1) * 10).size(10)
                .query(myQuery)
                .suggest(sug -> sug
                        .suggesters("my-suggestion", v -> v
                                .term(t -> t
                                        .field("content").size(2)
                                )
                                .text(query)
                        )
                )
                    , ObjectNode.class
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return response;
    }

    public SearchResponse searchSuggestion(String query){
        SearchResponse<ObjectNode> response;
        try {
            response = elasticsearchClient.search(s -> s
                            .index("wikipedia")
                            .suggest(sug -> sug
                                    .suggesters("", v -> v
                                            .term(t -> t
                                                    .field("content").size(2)
                                            )
                                            .text(query)
                                    )
                            )
                    , ObjectNode.class
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return response;
    }
}
