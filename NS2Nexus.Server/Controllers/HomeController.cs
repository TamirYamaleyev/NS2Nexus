using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NS2Nexus.Server.BLL.Interfaces;

namespace NS2Nexus.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class HomeController : ControllerBase
    {
        private IDataLoadLogic _dataLoadLogic;
        public HomeController(IDataLoadLogic dataLoadLogic)
        {
            _dataLoadLogic = dataLoadLogic;
        }

        [HttpDelete("Data")]
        public void DeleteAllData()
        {
            _dataLoadLogic.FlushData();
        }

        [HttpPost("Data")]
        public void CreateAllData()
        {
            _dataLoadLogic.LoadData();
        }
    }
}
