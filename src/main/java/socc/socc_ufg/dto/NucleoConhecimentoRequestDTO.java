package socc.socc_ufg.dto;

import java.util.List;

public record NucleoConhecimentoRequestDTO(
        String nucleo,
        Long areaId,
        Long facilitadorId,
        String descricao,
        List<Long> docentesIds,
        List<Long> disciplinasIds
) {}