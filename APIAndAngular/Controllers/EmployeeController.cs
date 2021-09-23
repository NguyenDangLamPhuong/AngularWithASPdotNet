using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using APIAndAngular.Models;

namespace APIAndAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"SELECT EmployeeId,EmployeeName,Department FROM dbo.Employee";
            DataTable dataTable = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCom = new SqlCommand(query, myCon))
                {
                    myReader = myCom.ExecuteReader();
                    dataTable.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult(dataTable);

        }

        //Insert data

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = @"
                    insert into dbo.Employee 
                    (EmployeeName,Department)
                    values 
                    (
                    '" + emp.EmployeeName + @"'
                    ,'" + emp.DepartmentName + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Add successfully");

        }

        //Update data

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = @" Update dbo.Employee set
                               EmployeeName=('" + emp.EmployeeName + @"'),
                               Department=('" + emp.DepartmentName + @"')
                               where EmployeeId=('" + emp.EmployeeId + @"')
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Update successfully");

        }

        //delete data

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @" Delete from dbo.Employee 
                                where EmployeeId=(" + id + @")
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Delete successfully");

        }

        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"SELECT DepartmentName FROM dbo.Department";
            DataTable dataTable = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCom = new SqlCommand(query, myCon))
                {
                    myReader = myCom.ExecuteReader();
                    dataTable.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }

            }

            return new JsonResult(dataTable);

        }

    }

    
}