using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class ClassPlaytime : IEntityBase
{
    public int Id { get; set; }

    public int RoundId { get; set; }

    public int PlayerId { get; set; }

    public double PlayTime { get; set; }

    public int ClassId { get; set; }

    public virtual Lifeforms? Class { get; set; }

    public virtual Player? Player { get; set; }

    public virtual RoundInfo? Round { get; set; }
}
