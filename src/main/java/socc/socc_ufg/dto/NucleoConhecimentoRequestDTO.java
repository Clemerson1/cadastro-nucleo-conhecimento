package socc.socc_ufg.dto;

import java.util.List;

public record NucleoConhecimentoRequestDTO(
        String nucleo,
        String descricao,
        Long areaId,
        Long facilitadorId,
        List<String> docentesNomes, // AGORA É LISTA DE NOMES
        List<String> disciplinasNomes // AGORA É LISTA DE NOMES
) {}