Feature: Comments API

  Scenario: Create a new comment
    Given I have the following comment data:
      | recurso | recursoId | comentario  | calificacion |
      | people  |         1 | Great post! |            5 |
    When I send a POST request to "/comments" with the comment data
    Then the response status should be 201
    And the response message should be "Comentario creado exitosamente."

  Scenario: Search for comments
    Given there are comments with the following data:
      | recurso | recursoId | comentario  | calificacion |
      | people  |         1 | Great post! |            5 |
    When I send a GET request to "/people/1/comments" with the query parameters:
      | limit | lastEvaluatedKey |
      |    10 | null             |
    Then the response status should be 200
    And the response should contain:
      | comments            | lastEvaluatedKey |
      | [array of comments] | null             |
