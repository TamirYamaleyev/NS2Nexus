using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class UserTypes : IEntityBase
{
    public int Id { get; set; }

    public string UserType { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
