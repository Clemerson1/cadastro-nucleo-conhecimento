package socc.socc_ufg.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import socc.socc_ufg.dto.NucleoConhecimentoRequestDTO;
import socc.socc_ufg.dto.NucleoConhecimentoResponseDTO;
import socc.socc_ufg.service.NucleoConhecimentoService;

@RestController
@RequestMapping("/nucleos")
public class NucleoConhecimentoController {

    private final NucleoConhecimentoService service;

    public NucleoConhecimentoController(NucleoConhecimentoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<NucleoConhecimentoResponseDTO> criar(@RequestBody NucleoConhecimentoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NucleoConhecimentoResponseDTO> editar(@PathVariable Long id, @RequestBody NucleoConhecimentoRequestDTO dto) {
        return ResponseEntity.ok(service.editar(id, dto));
    }
}

