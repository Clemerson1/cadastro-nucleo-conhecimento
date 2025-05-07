package socc.socc_ufg.service;

import com.seuusuario.seuprojeto.dto.*;
import com.seuusuario.seuprojeto.model.*;
import com.seuusuario.seuprojeto.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NucleoConhecimentoService {

    private final NucleoConhecimentoRepository nucleoRepo;
    private final AreaRepository areaRepo;
    private final FacilitadorRepository facilitadorRepo;
    private final DocenteRepository docenteRepo;
    private final DisciplinaRepository disciplinaRepo;

    public NucleoConhecimentoResponseDTO criar(NucleoConhecimentoRequestDTO dto) {
        NucleoConhecimento n = new NucleoConhecimento();
        preencherDados(dto, n);
        nucleoRepo.save(n);
        return toDTO(n);
    }

    public NucleoConhecimentoResponseDTO editar(Long id, NucleoConhecimentoRequestDTO dto) {
        NucleoConhecimento n = nucleoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Núcleo não encontrado"));
        preencherDados(dto, n);
        nucleoRepo.save(n);
        return toDTO(n);
    }

    private void preencherDados(NucleoConhecimentoRequestDTO dto, NucleoConhecimento n) {
        n.setNucleo(dto.nucleo());
        n.setDescricao(dto.descricao());
        n.setArea(areaRepo.findById(dto.areaId()).orElseThrow());
        n.setFacilitador(facilitadorRepo.findById(dto.facilitadorId()).orElseThrow());
        n.setDocentes(docenteRepo.findAllById(dto.docentesIds()));
        n.setDisciplinas(disciplinaRepo.findAllById(dto.disciplinasIds()));
    }

    private NucleoConhecimentoResponseDTO toDTO(NucleoConhecimento n) {
        return new NucleoConhecimentoResponseDTO(
                n.getId(),
                n.getNucleo(),
                n.getArea().getNome(),
                n.getFacilitador().getNome(),
                n.getDescricao(),
                n.getDocentes().stream().map(Docente::getNome).toList(),
                n.getDisciplinas().stream().map(Disciplina::getNome).toList()
        );
    }
}
