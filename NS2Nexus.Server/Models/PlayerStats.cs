using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class PlayerStats : IEntityBase
{
    public int Id { get; set; }

    public int PlayerId { get; set; }

    public int? MarineHits { get; set; }
    public int? MarineOnosHits { get; set; }
    public int? MarineMisses { get; set; }

    public int? AlienHits { get; set; }
    public int? AlienMisses { get; set; }

    public int? MarineKills { get; set; }
    public int? MarineDeaths { get; set; }

    public int? AlienKills { get; set; }
    public int? AlienDeaths { get; set; }

    public int CommanderSkill { get; set; }

    public int? CommanderSkillMarine { get; set; }

    public int? CommanderSkillAlien { get; set; }

    public int HiveSkill { get; set; }

    public int? HiveSkillMarine { get; set; }

    public int? HiveSkillAlien { get; set; }

    public int PlayerSkillOffset { get; set; }

    public double Adagrad { get; set; }

    public double CommAdagrad { get; set; }

    public virtual Player? Player { get; set; }
}
