package socc.socc_ufg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import socc.socc_ufg.model.Docente;

import java.util.Optional;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
    Optional<Docente> findByNome(String nomeDocente);
}
