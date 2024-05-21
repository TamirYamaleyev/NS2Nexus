using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class User : IEntityBase
{
    public int Id { get; set; }

    public int PlayerId { get; set; }

    public string Email { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }
     
    public int UserTypeId { get; set; }

    public virtual Player? Player { get; set; }

    public virtual UserTypes? UserType { get; set; }
}
