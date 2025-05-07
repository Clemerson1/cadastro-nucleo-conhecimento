package socc.socc_ufg.controller;

import socc.socc_ufg.dto.*;
import socc.socc_ufg.service.NucleoConhecimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nucleos")
@RequiredArgsConstructor
public class NucleoConhecimentoController {

    private final NucleoConhecimentoService service;

    @PostMapping
    public ResponseEntity<NucleoConhecimentoResponseDTO> criar(@RequestBody NucleoConhecimentoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NucleoConhecimentoResponseDTO> editar(@PathVariable Long id, @RequestBody NucleoConhecimentoRequestDTO dto) {
        return ResponseEntity.ok(service.editar(id, dto));
    }
}
