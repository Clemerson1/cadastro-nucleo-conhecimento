package socc.socc_ufg.dto;

import java.util.List;

public record NucleoConhecimentoResponseDTO(
        Long id,
        String nucleo,
        String area,
        String facilitador,
        String descricao,
        List<String> docentes,
        List<String> disciplinas
) {}
