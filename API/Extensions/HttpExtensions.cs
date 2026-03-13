using System.Diagnostics;
using System.Text.Json;
using API.RequestHelpers;
using Microsoft.Net.Http.Headers;

namespace API.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetaData metaData)
    {
        var options = new System.Text.Json.JsonSerializerOptions
        {
            PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
        };
        var value = System.Text.Json.JsonSerializer.Serialize(metaData, options);
        Debug.WriteLine("Adding pagination header: " + value);
        const string key = "Pagination";
        response.Headers.Append(key, JsonSerializer.Serialize(metaData, options));
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, key);
    }
}
