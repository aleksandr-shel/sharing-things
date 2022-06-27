using Microsoft.AspNetCore.Mvc;
using Sharing_things_backend.Core;
using Sharing_things_backend.Extensions;

namespace Sharing_things_backend.Controllers
{
    public class BaseApiController : ControllerBase
    {


        protected async Task<ActionResult> HandlePagedList<T>(IQueryable<T> query, PagingParams param)
        {
            var list = await PagedList<T>.CreateAsync(query, param.PageNumber, param.PageSize);

            Response.AddPaginationHeader(list.CurrentPage, list.PageSize, list.TotalCount, list.TotalPages);

            return Ok(list);
        }
    }
}
