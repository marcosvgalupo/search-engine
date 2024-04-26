package com.elasticsearch.search.domain;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
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
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class EsClient {
    private ElasticsearchClient elasticsearchClient;

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

    public SearchResponse search(String query) {

        Query queryToBeDone;
        Query matchQuery = MatchQuery.of(q -> q.field("content").query(query))._toQuery();

//        if (!matchPhraseQuery(query).isEmpty()){
//            queryToBeDone = (new BoolQuery.Builder()).should(matchQuery).build()._toQuery();
//            System.out.println("entrou");
//        }
//        else{
//            queryToBeDone = matchQuery;
//        }

        queryToBeDone = (new BoolQuery.Builder()).should(matchQuery).build()._toQuery();

        //var b = new BoolQuery.Builder();
        //Query matchPhrase = b.should(matchQuery).build()._toQuery();

        SearchResponse<ObjectNode> response;
        try {
            response = elasticsearchClient.search(s -> s
                .index("wikipedia").from(0).size(10)
                .query(queryToBeDone), ObjectNode.class
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return response;
    }

    public static List<String> matchPhraseQuery(String query){
        if(query.contains("\"")){
            Pattern quotesPattern = Pattern.compile("\\Q\"\\E(.*?)\\Q\"\\E", Pattern.DOTALL);
            Matcher matchedPhrases = quotesPattern.matcher(query);

            List<String> matchPhraseContentList = matchedPhrases.results().map(m -> m.group(1)).toList();
            return matchPhraseContentList;
        }
        return new ArrayList<String>();
    }

    public static void main(String[] args) {
        //System.out.println(matchPhraseQuery("The binary \"search\" and the algorithm \"teste\""));
    }
}
