package com.elasticsearch.search.api.model;

import java.util.Objects;
import com.elasticsearch.search.api.model.ResultHits;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * Result
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-07-01T10:00:27.313761127-03:00[America/Sao_Paulo]")

public class Result  implements Serializable {
  private static final long serialVersionUID = 1L;

  @JsonProperty("Hits")
  @Valid
  private List<ResultHits> hits = null;

  @JsonProperty("suggest")
  private String suggest;

  @JsonProperty("total")
  private Integer total;

  public Result hits(List<ResultHits> hits) {
    this.hits = hits;
    return this;
  }

  public Result addHitsItem(ResultHits hitsItem) {
    if (this.hits == null) {
      this.hits = new ArrayList<>();
    }
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * Get hits
   * @return hits
  */
  @ApiModelProperty(value = "")

  @Valid

  public List<ResultHits> getHits() {
    return hits;
  }

  public void setHits(List<ResultHits> hits) {
    this.hits = hits;
  }

  public Result suggest(String suggest) {
    this.suggest = suggest;
    return this;
  }

  /**
   * Get suggest
   * @return suggest
  */
  @ApiModelProperty(value = "")


  public String getSuggest() {
    return suggest;
  }

  public void setSuggest(String suggest) {
    this.suggest = suggest;
  }

  public Result total(Integer total) {
    this.total = total;
    return this;
  }

  /**
   * Get total
   * @return total
  */
  @ApiModelProperty(value = "")


  public Integer getTotal() {
    return total;
  }

  public void setTotal(Integer total) {
    this.total = total;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Result result = (Result) o;
    return Objects.equals(this.hits, result.hits) &&
        Objects.equals(this.suggest, result.suggest) &&
        Objects.equals(this.total, result.total);
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits, suggest, total);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Result {\n");
    
    sb.append("    hits: ").append(toIndentedString(hits)).append("\n");
    sb.append("    suggest: ").append(toIndentedString(suggest)).append("\n");
    sb.append("    total: ").append(toIndentedString(total)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

